import { Configuration01Icon, StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { getDifficulty } from "@/components/challenges/challenge-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { paths } from "@/lib/paths";
import type { ChallengeResponse } from "@/services/challenges/types";

export function TeacherChallengeCard({
  challenge,
}: {
  challenge: ChallengeResponse;
}) {
  const diff = getDifficulty(challenge.difficulty);

  return (
    <Card className="bg-[#121214] border-white/5 p-5 flex flex-col gap-4 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className={`${diff.cn} border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5`}
          >
            {diff.label}
          </Badge>
          <Badge
            variant="secondary"
            className={`border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5 ${
              challenge.isPublished
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            {challenge.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-white shrink-0">
          <HugeiconsIcon
            icon={StarIcon}
            size={14}
            className="text-indigo-400"
          />
          {challenge.rewardPoints.toLocaleString()} XP
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">
          {challenge.title}
        </h3>
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>
      </div>

      <Link
        href={paths.dashboard.teacher.challengeManage(challenge.challengeId)}
        className="self-start"
      >
        <Button className="h-8 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/5 rounded text-[10px] font-bold tracking-widest px-4 gap-1.5">
          <HugeiconsIcon icon={Configuration01Icon} size={13} />
          MANAGE
        </Button>
      </Link>
    </Card>
  );
}
