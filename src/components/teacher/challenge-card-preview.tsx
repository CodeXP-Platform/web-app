import {
  CARD_GRADIENTS,
  DIFFICULTY_MAP,
} from "@/components/challenges/challenge-card";
import { Badge } from "@/components/ui/badge";

interface ChallengeCardPreviewProps {
  title: string;
  description: string;
  difficulty: number;
  rewardPoints: number | string;
  /** Gradient index (cycles through CARD_GRADIENTS). */
  index?: number;
}

/**
 * Read-only preview of how a challenge card looks on the student catalog.
 * Updates live as the teacher types into the meta form.
 */
export function ChallengeCardPreview({
  title,
  description,
  difficulty,
  rewardPoints,
  index = 0,
}: ChallengeCardPreviewProps) {
  const diff = DIFFICULTY_MAP[difficulty] ?? {
    label: "EXPERT",
    cn: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };
  const bg = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const pts =
    typeof rewardPoints === "string" ? Number(rewardPoints) || 0 : rewardPoints;

  return (
    <div className="rounded-xl overflow-hidden border border-white/5 bg-[#121214] w-full select-none">
      {/* Cover area — mirrors ChallengeCard */}
      <div className={`h-28 w-full relative ${bg} flex items-start p-3.5`}>
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <Badge
          variant="secondary"
          className={`${diff.cn} border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5 relative z-10`}
        >
          {diff.label}
        </Badge>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-2">
        <h4 className="text-sm font-bold text-white tracking-tight truncate">
          {title.trim() || (
            <span className="text-zinc-600 italic font-normal">
              Challenge title
            </span>
          )}
        </h4>
        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {description.trim() || (
            <span className="text-zinc-600 italic">
              Your description will appear here.
            </span>
          )}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1.5 text-xs font-bold text-white">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              aria-hidden="true"
            >
              <title>XP</title>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {pts.toLocaleString()} XP
          </span>
          <div className="h-6 bg-white/5 border border-white/5 rounded text-[9px] font-bold tracking-widest px-3 text-zinc-300 flex items-center">
            START
          </div>
        </div>
      </div>
    </div>
  );
}
