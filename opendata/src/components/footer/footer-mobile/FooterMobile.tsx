function FooterMobile() {
  return (
    <footer className="mt-12 text-center text-xs font-light text-gray-600">
      <div className="mb-4">
        <iframe
          title="Harita"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.085366275392!2d-122.41941508468132!3d37.77492977975901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c34e45a17%3A0xc0e7a8ebddfa2a6b!2sSan+Francisco%2C+CA!5e0!3m2!1str!2str!4v1615483219041!5m2!1str!2str"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      © 2023 Omer Sayma. All rights reserved.
    </footer>
  );
}

export default FooterMobile;
