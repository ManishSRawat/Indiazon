
const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Indiazon. All rights reserved.</p>
        <p className="mt-1">A world-class e-commerce experience, designed by an expert.</p>
      </div>
    </footer>
  );
};

export default Footer;
