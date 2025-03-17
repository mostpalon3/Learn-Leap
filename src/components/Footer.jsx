function Footer() {
  return (
        <footer className="px-10 w-[85%] flex flex-col relative left-[15%] py-10 bg-black text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Community Hub</h3>
              <p className="text-sm opacity-80">
                Learn, share, and grow with our community of passionate learners.
              </p>
            </div>
            {["Community", "About Us", "Contact"].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{section}</h4>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="text-sm opacity-80 hover:opacity-100">
                      <a href="#">Link {item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 Community Hub. All rights reserved.</p>
          </div>
        </footer>
  )
}

export default Footer
