import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import {
    TokenCredentialAuthenticationProvider,
    TokenCredentialAuthenticationProviderOptions
} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { Application, ServicePrincipal } from "@microsoft/microsoft-graph-types";
import "isomorphic-fetch";
import { validate } from "uuid"
import { PontifexAADConfig } from "./types";

const APPLICATIONS_API_PATH = "/applications"
const SERVICE_PRINCIPALS_API_PATH = "/servicePrincipals"

export class PontifexAAD {
    private aad: Client;
    application = {
        create: async (app: Application): Promise<Application> => {
            return await this.aad.api(APPLICATIONS_API_PATH).post(app)
        },
        get: async (appObjectId: string): Promise<Application> => {
            const application = await this.aad.api(`${APPLICATIONS_API_PATH}/${appObjectId}`).get()

            return application
        },
        update: async (appObjectId: string, app: Application) => {
            await this.aad.api(`${APPLICATIONS_API_PATH}/${appObjectId}`).patch(app)
        },
        delete: async (appObjectId: string) => {
            await this.aad.api(`${APPLICATIONS_API_PATH}/${appObjectId}`).delete()
        }
    }
    servicePrincipal = {
        create: async (appId: string): Promise<ServicePrincipal> => {
            return this.aad.api(SERVICE_PRINCIPALS_API_PATH).post({
                appId
            })
        },
        grantPermission: async (principalId: string, resourceId: string, appRoleId: string): Promise<string> => {
            const roleAssignment = await this.aad.api(`${SERVICE_PRINCIPALS_API_PATH}/${resourceId}/appRoleAssignedTo`).post({
                principalId,
                resourceId,
                appRoleId
            })

            return roleAssignment.id
        },
        revokePermission: async (resourceId: string, roleAssignmentId: string) => {
            await this.aad.api(`${SERVICE_PRINCIPALS_API_PATH}/${resourceId}/appRoleAssignedTo/${roleAssignmentId}`).delete()
        },
        getByAppId: async (appId: string): Promise<ServicePrincipal> => {
            if (!validate(appId)) {
                throw new Error("Invalid appId")
            }

            type ServicePrincipalQuery = {
                "@odata.context": string,
                value: ServicePrincipal[]
            }
            const {value}: ServicePrincipalQuery = await this.aad.api(`${SERVICE_PRINCIPALS_API_PATH}?$filter=appId eq '${appId}'`).get()

            if (value.length > 0) {
                return value[0]
            } else {
                throw new Error(`No ServicePrincipal found for appId, ${appId}`)
            }
        }
    }

    constructor(config?: PontifexAADConfig) {
        const {tenantId, clientId, clientSecret} = {
            tenantId: process.env.PONTIFEX_TENANT_ID,
            clientId: process.env.PONTIFEX_CLIENT_ID,
            clientSecret: process.env.PONTIFEX_CLIENT_SECRET,
            ...config
        }

        if (!tenantId) {
            throw new Error("Missing tenantId")
        }

        if (!clientId) {
            throw new Error("Missing clientId")
        }

        if (!clientSecret) {
            throw new Error("Missing clientSecret")
        }

        const tokenCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
        const options: TokenCredentialAuthenticationProviderOptions = {scopes: ["https://graph.microsoft.com/.default"]};

        const authProvider = new TokenCredentialAuthenticationProvider(tokenCredential, options)
        this.aad = Client.initWithMiddleware({
            debugLogging: config?.debugLogging,
            authProvider
        })
    }
}


