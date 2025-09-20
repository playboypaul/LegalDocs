export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex-col gap-4 sm:flex-row py-6 text-center sm:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Legal Draft AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
