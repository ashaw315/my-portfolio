export default function Footer() {
  return (
    <footer className="layout-footer w-full max-w-content mx-auto px-6 py-4 border-t border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-foreground/50">
        <span>&copy; {new Date().getFullYear()} Adam Shaw</span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ashaw315"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adam-shaw-studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://adamshaw.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Art Portfolio
          </a>
          <a
            href="mailto:ashaw315@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            ashaw315@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
