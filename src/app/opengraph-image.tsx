import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        color: "#1a1a2e",
        fontSize: 64,
        fontWeight: 800,
        padding: 80,
        textAlign: "center",
      }}
    >
      {site.name}
    </div>,
    size,
  );
}
