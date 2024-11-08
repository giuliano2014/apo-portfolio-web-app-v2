import FloatingNavbar from "@/components/ui/floatingNavbar/FloatingNavbar";

const Navbar = () => {
  const navbarItems = [
    {
      name: "Projets",
      link: "/",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return <FloatingNavbar navbarItems={navbarItems} />;
};

export default Navbar;
