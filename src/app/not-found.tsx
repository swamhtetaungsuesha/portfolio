import ErrorView from "@/views/error/ErrorView";

export default function NotFound() {
  return <ErrorView code={404} />;
}
