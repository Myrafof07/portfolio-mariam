import FormContact from '../components/FormContact';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center px-6 md:px-20 py-20"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Restons en contact
        </h2>
        <p className="text-center text-white/70 mb-12 text-lg">
          Vous avez un projet, une question ou envie de collaborer ? 
          N'hésitez pas à m'envoyer un message.
        </p>

        <FormContact />
      </div>
    </section>
  );
}
