import Image from "next/image";

export default function Logo({
  className = "",
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/RelyTaskICONWhiteBg.png"
        alt=""
        aria-hidden="true"
        width={112}
        height={115}
        className="h-7 w-7 shrink-0 object-contain"
        priority
      />
      {showWord && (
        <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-extrabold tracking-[-0.03em]">
          <span className="text-ink-2">RELY</span>
          <span className="text-flame">TASK</span>
        </span>
      )}
    </span>
  );
}
