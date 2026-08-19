/**
 * AEO definition block — extractable „Yuvoo este..." for AI citations.
 * Visible on homepage and quiz intro (not hidden).
 */

interface YuvooDefinitionBlockProps {
  className?: string;
}

export default function YuvooDefinitionBlock({ className = "" }: YuvooDefinitionBlockProps) {
  return (
    <section
      className={`yuvoo-definition-block py-4 ${className}`.trim()}
      aria-label="Despre Yuvoo"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <p className="lead text-center mb-0 text-muted">
              <strong>Yuvoo</strong> este platforma AI din România care ajută părinții să descopere
              sportul potrivit pentru copiii lor (4–14 ani). Oferim chestionar personalizat,
              director de cluburi sportive și rețea de specialiști pediatri relevanți pentru sport.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
