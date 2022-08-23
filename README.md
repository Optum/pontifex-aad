<div id="top"></div>

<!-- NOTES -->
<!--
*** Individual sections below can be removed if not needed
-->

<!-- PROJECT SHIELDS -->
<!--
*** We are using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">pontifex-aad</h3>

  <p align="center">
   Making working with Azure Active Directory + Oauth2 Easy
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#maintainers">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Helper package for managing App Registrations, App Roles, and permission granting within Azure Active Directory.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Typescript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Optum/pontifex-aad.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Creating an App Registration and associated Service Principal
```typescript
const application = await pontifex.application.create({
    "displayName": `${environment}-${request.applicationName}`,
    "api": {
        "requestedAccessTokenVersion": 2 // tell AAD to use v2 OAuth2 tokens
    }
})

context.log(`application created. objectId: ${application.id}, appId: ${application.appId}`)

context.log(`creating service principal for appId ${application.appId}`)
await pontifex.servicePrincipal.create(application.appId)
```

### Granting Access to an App Role

```typescript
const roleAssignmentId = await pontifex.servicePrincipal.grantPermission(clientServicePrincipal.id,
    resourceServicePrincipal.id, appRole.id)
```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MAINTAINERS -->
## Maintainers

- Alexander Aavang
  - GitHub Enterprise: [aaavang](https://github.com/aaavang)
  - Email: alexander.aavang@optum.com, alex.aavang@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Optum/pontifex-aad.svg?style=for-the-badge
[contributors-url]: https://github.com/Optum/pontifex-aad/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Optum/pontifex-aad.svg?style=for-the-badge
[forks-url]: https://github.com/Optum/pontifex-aad/network/members
[stars-shield]: https://img.shields.io/github/stars/Optum/pontifex-aad.svg?style=for-the-badge
[stars-url]: https://github.com/Optum/pontifex-aad/stargazers
[issues-shield]: https://img.shields.io/github/issues/Optum/pontifex-aad.svg?style=for-the-badge
[issues-url]: https://github.com/Optum/pontifex-aad/issues
[license-shield]: https://img.shields.io/github/license/Optum/pontifex-aad.svg?style=for-the-badge
[license-url]: https://github.com/Optum/pontifex-aad/blob/master/LICENSE.txt
