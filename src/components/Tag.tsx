function Tag({ color = "gray", label }: { color?: string; label: string }) {
  return (
    <div className="text-sm rounded bg-gray-100 py-1 px-2" style={{ color }}>
      {label}
    </div>
  );
}

export default Tag;
