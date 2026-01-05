export default function Contact() {
  return (
    <section
    id="contact"
      className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center px-6 md:px-20"
    >
      <h2 className="text-4xl font-bold mb-8 text-center">Contact</h2>
      <p className="mb-4">Envie de collaborer ou de discuter ? Contacte-moi :</p>
      <a
        href="mf8013006@gmail.com"
        className="bg-purple-700 px-6 py-3 rounded-lg hover:bg-purple-800 transition"
      >
        Envoyer un e-mail
      </a>
    </section>
  );
}
