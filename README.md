<img src="https://salt-talent-pool.vercel.app/_next/image?url=%2FlogoBlack.png&w=384&q=75" alt="Salt Talent Pool Logo" width="300" height="58">


# Salt Talent Pool

## Overview
Salt Talent Pool is a cutting-edge application designed to streamline the process of connecting software development consultants with recruiters. It offers a user-friendly platform for browsing consultants based on their skills and expertise, making it easy for recruiters to find the right talent for their projects.

## Usage
To view the application, visit [Salt Talent Pool](https://talents.salt.dev/).

## Features

- **Clients can sign in to their accounts.**
- **Browse through the list of developers and add them to their cart for quick reference.**

- **Search consultants [Using Meilisearch]:**
  - Efficiently search for software development consultants based on specific categories, such as searching by skill, name, location, etc.

- **SALT sign in (for developers, requires an @appliedtechnology email):**
  - Developer Form
  - Developers can easily fill out their profile information, which will be displayed for recruiters.
  - Showcase your skills, experience, and expertise to attract potential opportunities.

## Technology Stack
The application is built with the powerful T3 stack, combining cutting-edge technologies to deliver a robust and efficient platform.

- **T3 Stack Components:**
  - T - tRPC
  - T - Tailwind
  - T - Typescript

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Founders
Development Team (Mob Name: Developoors)
- Jou-Fang Wang
- Allan Heremi
- Rasmus Eklund

## Project Status
Salt Talent Pool is currently in maintenance mode. While not actively adding new features, the application is still supported and maintained to ensure a smooth experience for users.

## How to Contribute
We welcome contributions and feedback from the community. If you have suggestions, bug reports, or want to contribute to the project.

# Meillisearch Step-By-Step (for production)
1. Navigate to the "meilisearch" folder

2. Follow this guide: https://dev.to/jakovglavac/deploy-meilisearch-on-flyio-p89.

- This guide will create/launch an application for you on Fly.io.
- The guide will tell you to use ´flyctl login´, this command will not work, instead, use ´flyctl auth login´.

3. Make sure you set the Master Key for your Fly.io application under:

- Apps > [YOUR_APP_NAME] > Secrets > New Secret.
- Make sure that the secret is named MEILI_MASTER_KEY.

4. Make sure you have NEXT_MEILISEARCH_HOST and NEXT_MEILISEARCH_MASTER_KEY set in your .env file.

- You can get these values from fly.io.

5. After the secret is created, make sure you redeploy meilisearch by running ´flyctl deploy'.

6. Create, update or delete a developer to seed Meilisearch.