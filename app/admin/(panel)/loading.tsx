/** Shown instantly while a module's data loads; the real page rises in over it. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading module">
      <div className="adm-head">
        <div className="adm-head-text">
          <div className="adm-head-prompt">
            <p className="adm-prompt flex items-center gap-2">
              <span className="adm-spinner !w-3 !h-3" aria-hidden="true" />
              mounting module…
            </p>
            <div className="adm-skel h-[2.4rem] w-[min(22rem,70%)]" />
          </div>
          <div className="adm-skel h-4 w-[min(34rem,85%)] mt-4 ml-7" />
        </div>
      </div>
      <div className="adm-stack">
        {[0, 1].map((panel) => (
          <div key={panel} className="adm-panel">
            <div className="adm-panel-bar">
              <div className="adm-skel w-8 h-8" />
              <div className="adm-skel h-4 w-40" />
            </div>
            <div className="adm-panel-body adm-form-grid">
              {[0, 1, 2, 3].map((field) => (
                <div key={field}>
                  <div className="adm-skel h-3.5 w-24 mb-3" />
                  <div className="adm-skel h-[var(--control)]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
