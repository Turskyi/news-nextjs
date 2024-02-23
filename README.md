[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)
![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=news-nextjs-pink&style=plastic)

# News Glance

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**News Glance** is a website that displays top ten news articles and uses AI to
generate a conclusion based on the first five titles. It also allows users to
view the full article in a web-view.

## Installation and usage

To run this project locally, you will need to have Node.js and npm installed on
your machine. You will also need to get an API key
from [News API](https://newsapi.org) and add it to your `.env.local` file
as `NEWS_API_KEY`.

Follow these steps to install and run the project:

- Clone this repository to your local machine
  using `git clone https://github.com/Turskyi/news-nextjs.git`.
- Navigate to the project directory using `cd news-glance`.
- Install the dependencies using `npm install`.
- Run the development server using `npm run dev`.
- Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page
auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/news](http://localhost:3000/api/news). This
endpoint can be edited in `pages/api/news.ts`.

This project
uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Demo and screenshots

You can view a live demo of the project [here](https://news.turskyi.com).

Here is a screenshot of the project:

<!--suppress CheckImageSize -->
<img src="screenshots/news-glance-home-2024-02-17.png" width="800"  alt="screenshot of the home page">

## Technologies and tools

This project was built using the following technologies and tools:

- [Next.js](https://nextjs.org): A React framework for building fast and
  scalable web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom
  designs.
- [News API](https://newsapi.org): A simple and easy-to-use API that returns
  JSON metadata for headlines and articles live all over the web.
- **SWR**: A React hook for data fetching.

- Programming language: [TypeScript](https://www.typescriptlang.org);

- Version control system: [Git](https://git-scm.com);

- Git Hosting Service: [GitHub](https://github.com);

- CI/CD: [Vercel](https://vercel.com/features/previews) is used to
  deliver the new releases to the production environment after every push to the
  **master** branch;

- Api: https://platform.openai.com/docs/api-reference;

- Architectural pattern:
  [Monolith](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#all-in-one-applications);

- **Code Readability:** code is easily readable with no unnecessary blank lines,
  no unused variables
  or methods, and no commented-out code, all variables, methods, and resource
  IDs are descriptively
  named such that another developer reading the code can easily understand their
  function.

## Contribution

This project is open for contributions. If you want to report a bug, request a
feature, or submit a pull request, please feel free to do so. You can also
contact me at dmytro@turskyi.com if you have any questions or feedback.

## Credits

This project is based on
the [Next.js Full Beginner Course (Pages Directory) [2023] TypeScript](https://youtu.be/e1EIwuO-Dlo?si=YwNxjUee5ovtzIXe)
by [Coding in Flow](https://github.com/codinginflow) YouTube channel.
All credit goes to the original
author [Florian Walther](https://github.com/florianwalther-private).
I only followed
along and made some minor changes.
