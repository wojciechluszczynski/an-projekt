import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";

const DEFAULT_URL = "https://an-projekt.com.pl";

const AdminQrWidget = () => {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [preview, setPreview] = useState<string>("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    QRCode.toCanvas(canvas, url || DEFAULT_URL, {
      width: 180,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    }).catch(() => undefined);
    QRCode.toDataURL(url || DEFAULT_URL, {
      width: 180,
      margin: 2,
    }).then(setPreview).catch(() => undefined);
  }, [url]);

  const handleDownload = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(url || DEFAULT_URL, {
        width: 1024,
        margin: 4,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "H",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      const safe = (url || DEFAULT_URL).replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
      a.download = `qr-${safe || "an-projekt"}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error("QR download failed", e);
    }
  };

  return (
    <div className="bg-secondary/70 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-start gap-5">
      <canvas ref={previewCanvasRef} className="rounded-md bg-background border border-border shrink-0" aria-hidden />
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center gap-2 mb-2">
          <QrCode size={16} className="text-accent" />
          <h3 className="font-heading text-base text-foreground">Kod QR do druku</h3>
        </div>
        <p className="font-body text-xs text-muted-foreground mb-3">
          Wygeneruj kod QR z linkiem do strony – do wizytówek, ulotek, banerów. Domyślnie prowadzi do strony głównej.
        </p>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={DEFAULT_URL}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent mb-3"
        />
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground font-body text-sm hover:bg-accent/90 transition-colors"
        >
          <Download size={14} /> Pobierz PNG (1024×1024)
        </button>
      </div>
    </div>
  );
};

export default AdminQrWidget;
