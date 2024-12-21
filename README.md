# JSM Ecommerce - Next.js Project

Welcome to the **JSM Ecommerce** project! This application is a fully functional ecommerce platform built using cutting-edge technologies, designed to deliver a seamless shopping experience with a clean and modern UI/UX.

## Features
- **Dynamic Product Listings**: Browse through a collection of JSM products with filters and categories.
- **Responsive Design**: Fully optimized for all devices with a smooth user experience.
- **Secure Payments**: Integrated with Stripe for seamless and secure payment processing.
- **User Authentication**: Sign-up, login, and user session management.
- **Product Management**: Easily add, update, and delete products through an admin dashboard.
- **Cart and Wishlist**: Add items to your cart or wishlist with real-time updates.
- **Image Uploads**: Effortlessly upload product images using UploadThing.
- **Real-time Notifications**: Powered by Redis for updates and alerts.

## Tech Stack
### Frontend
- **Next.js (Latest with App Router)**: The latest version of Next.js utilizing the app router for optimized performance and routing.
- **React**: A declarative library for building UI components.
- **ShadCN**: Enhanced component library for consistent and customizable designs.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Prisma**: Database ORM for efficient and type-safe database queries.
- **PostgreSQL**: Reliable and scalable relational database.
- **Redis**: Real-time caching and notifications.
- **Stripe**: Payment gateway for secure transactions.

### Deployment
- **Vercel**: Hosting and deployment platform for seamless CI/CD workflows.

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Redis server

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/bikas-dahal/jsmh.git
   cd jsm-ecommerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/creation
UPLOADTHING_TOKEN=

NEXT_PUBLIC_BASE_URL='http://localhost:3000'

DATABASE_URL=
REDIS_URL=
REDIS_TOKEN=


STRIPE_API_KEY=


STRIPE_SECRET_WEBHOOK=
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Project Structure
```plaintext
/
├── components/       # Reusable React components
├── app/              # Next.js app router and route handling
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── styles/           # Global styles (Tailwind)
├── utils/            # Utility functions and helpers
└── .env.example      # Example environment variables
```

## Screenshots

**Home Page**
![Home Page](https://utfs.io/f/YkJz0HgRgqByzJ15teWO7jiNAwLhfQXxqP6JsFoB8cmUSI34)

**Product Page**
![Product Page](https://utfs.io/f/YkJz0HgRgqBynuGa73TVbQVFhWc3BMOgvPYRiz6AeUX0TCLI)

## Deployment
This project is deployed on Vercel. To deploy your own version:
1. Connect your repository to Vercel.
2. Set up the environment variables on the Vercel dashboard.
3. Deploy the project with a single click.

## Future Improvements
- Implementing advanced search with Algolia.
- Adding multi-language support.
- Improving accessibility and SEO.
- Supporting additional payment methods.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Stripe](https://stripe.com/)

---
Thank you for checking out **JSM Ecommerce**! If you have any questions or need help, feel free to reach out. Happy coding!

