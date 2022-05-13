interface ImageProps {
  type: string;
  icon?: string | null;
  id?: string | null;
  banner?: string | null;
}

export default function getImage({ id, banner, icon, type = "banner" }: ImageProps) {
  const isDev = process.env.NODE_ENV === "development";

  if (type === "icon") {
    return isDev
      ? `/images/form-entry-test-thumbnail.png`
      : `https://assets.circleforms.net/${id}/${icon}`;
  }

  if (type === "banner") {
    return isDev ? `/images/form-entry-test.jpg` : `https://assets.circleforms.net/${id}/${banner}`;
  }
}
