<div style="display: flex; flex-direction:row-reverse;justify-content: left;">
<div style="display:flex;">
    <img src="./public/assets/images/rick.svg" alt="rick" width="50" height="40"/>
    <h1>Rick and Morty Characters App</h1>
</div>
</div>

## Description

The Rick and Morty Character Search App is a web application that allows users to view and search for characters from the popular TV show "Rick and Morty" based on various criteria such as location, name, and episode. The app is built using TypeScript, Next.js, and Tailwind CSS, providing a seamless experience for both frontend and backend development.

## Technology Stack

### Frontend

- **Next.js**: Next.js is chosen for the frontend framework due to its server-side rendering capabilities, which enhance performance and SEO. It also offers TypeScript support out of the box, making it easier to write type-safe code.
- **Tailwind CSS**: Tailwind CSS is used for styling the frontend components. Its utility-first approach allows for rapid development and easy customization.

### Backend

- **REST API**: The app communicates with the Rick and Morty API, which provides a REST endpoint for accessing character data. RESTful APIs are chosen due to their simplicity and ease of integration, making it suitable for this project's requirements.
- **TypeScript**: TypeScript is used for backend development to ensure type safety and code maintainability. It enables catching errors early in the development process and provides better documentation for the codebase.

## Features

- **Character Search**: Users can search for characters based on various criteria such as location, name, and episode.
- **Character Details**: When a user clicks on a character, they are taken to the details page where they can see details about the character.
- **Note Persistence**: Users can add notes about the character, and these notes persist because they are saved in local storage.
- **Fully Responsive**: The entire app is fully responsive, ensuring a consistent user experience across different devices.

## Design and Implementation Decisions

### Choice of Endpoint

The project utilizes the REST endpoint provided by the Rick and Morty API. This decision is based on several factors:

- Familiarity: I have experience working with REST APIs, making it easier to integrate and manage.
- Project Requirements: The REST endpoint meets the project requirements for retrieving character data efficiently.
- Learning Curve: Given the limited experience with GraphQL, opting for REST reduces the learning curve and allows for faster development.

### Technology Stack

The technology stack includes Next.js, TypeScript, and Tailwind CSS:

- Next.js: Chosen for its server-side rendering capabilities, which improve performance and SEO. Additionally, Next.js offers TypeScript support, aligning with the preference for type-safe code.
- TypeScript: Used for both frontend and backend development to ensure type safety and code reliability. TypeScript catches errors at compile time, reducing runtime errors and enhancing code maintainability.
- Tailwind CSS: Selected for its utility-first approach, enabling rapid styling and easy customization. Tailwind CSS streamlines the frontend development process, allowing for consistent and visually appealing UI designs.

### Saving of notes to local storage

- The decision to save notes to local storage was made to ensure that the notes persist across sessions. This approach provides a seamless user experience, allowing users to add and view notes without the need for server-side storage.

## Installation and Usage

To run the project locally, follow these steps:

1. Clone the repository from GitHub:

```
git clone git@github.com:mnaibei/rickandmorty.git
```

2. Navigate to the project directory:

```
cd rickandmorty
```

3. Install the dependencies:

```
npm install
```

4. Run the development server:

```
npm run dev
```

5. Alternatively, you can use Yarn:

```
yarn dev
```

6. Open your web browser and go to `http://localhost:3000` to view the app.

7. View Live Demo [here](https://rickandmorty-pi-topaz.vercel.app/)

## Future Considerations

- **GraphQL Integration**: As proficiency in GraphQL improves, consider transitioning to a GraphQL endpoint for improved data querying and manipulation.
- **Authentication and Authorization**: Implement user authentication and authorization features to enhance security and personalize user experiences.

## Conclusion

The Rick and Morty Character Search App leverages Next.js, TypeScript, and Tailwind CSS to deliver a responsive and user-friendly web application. By documenting design and implementation decisions, clarity and transparency are maintained throughout the development process, facilitating collaboration and future enhancements.
