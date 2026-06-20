"use client";

import {
  Add01Icon,
  Delete02Icon,
  EyeIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChallengesController } from "@/services/challenges/controller";
import type {
  CreateTestCaseRequest,
  TestCaseResponse,
} from "@/services/challenges/types";
import type { ErrorResponse } from "@/services/iam/types";

function readError(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response) {
    return (err.response.data as ErrorResponse).message ?? fallback;
  }
  return fallback;
}

const CELL_CN =
  "min-h-16 bg-[#0a0a0c] border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 font-mono text-xs";

export function TestCaseManager({
  challengeId,
  codeTemplateId,
}: {
  challengeId: string;
  codeTemplateId: string;
}) {
  const [testCases, setTestCases] = useState<TestCaseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New test case draft
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await ChallengesController.getTestCases(
          challengeId,
          codeTemplateId,
        );
        if (active) setTestCases(data);
      } catch (err) {
        if (active) setError(readError(err, "Failed to load test cases."));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [challengeId, codeTemplateId]);

  async function handleAdd() {
    if (!input.trim() || !expectedOutput.trim()) {
      setError("Input and expected output are required.");
      return;
    }
    setAdding(true);
    setError(null);
    try {
      const body: CreateTestCaseRequest = { input, expectedOutput, isHidden };
      const created = await ChallengesController.createTestCase(
        challengeId,
        codeTemplateId,
        body,
      );
      setTestCases((prev) => [...prev, created]);
      setInput("");
      setExpectedOutput("");
      setIsHidden(false);
    } catch (err) {
      setError(readError(err, "Could not add the test case."));
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(testCaseId: string) {
    setError(null);
    try {
      await ChallengesController.deleteTestCase(
        challengeId,
        codeTemplateId,
        testCaseId,
      );
      setTestCases((prev) => prev.filter((t) => t.testCaseId !== testCaseId));
    } catch (err) {
      setError(readError(err, "Could not delete the test case."));
    }
  }

  async function handleToggleHidden(tc: TestCaseResponse) {
    setError(null);
    try {
      const updated = await ChallengesController.updateTestCase(
        challengeId,
        codeTemplateId,
        tc.testCaseId,
        { isHidden: !tc.isHidden },
      );
      setTestCases((prev) =>
        prev.map((t) => (t.testCaseId === updated.testCaseId ? updated : t)),
      );
    } catch (err) {
      setError(readError(err, "Could not update the test case."));
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Test Cases ({testCases.length})
        </h4>
      </div>

      {loading ? (
        <p className="text-xs text-zinc-600">Loading test cases…</p>
      ) : testCases.length === 0 ? (
        <p className="text-xs text-zinc-600">
          No test cases yet. Add at least one so solutions can be graded.
        </p>
      ) : (
        <div className="space-y-2">
          {testCases.map((tc) => (
            <div
              key={tc.testCaseId}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-start bg-[#0a0a0c] border border-white/5 rounded-lg p-3"
            >
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-zinc-600">
                  Input
                </span>
                <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap break-words">
                  {tc.input}
                </pre>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-zinc-600">
                  Expected
                </span>
                <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap break-words">
                  {tc.expectedOutput}
                </pre>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <button
                  type="button"
                  onClick={() => handleToggleHidden(tc)}
                  title={
                    tc.isHidden ? "Hidden from students" : "Visible to students"
                  }
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border transition-colors ${
                    tc.isHidden
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                      : "bg-white/[0.03] text-zinc-400 border-white/5 hover:bg-white/5"
                  }`}
                >
                  <HugeiconsIcon
                    icon={tc.isHidden ? ViewOffIcon : EyeIcon}
                    size={12}
                  />
                  {tc.isHidden ? "Hidden" : "Visible"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(tc.testCaseId)}
                  className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete test case"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new test case */}
      <div className="border border-dashed border-white/10 rounded-lg p-3 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              Input
            </span>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="[2, 7, 11, 15], 9"
              className={CELL_CN}
            />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              Expected output
            </span>
            <Textarea
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              placeholder="[0, 1]"
              className={CELL_CN}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHidden}
              onChange={(e) => setIsHidden(e.target.checked)}
              className="accent-indigo-500"
            />
            Hidden from students
          </label>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={adding}
            className="h-8 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 rounded text-[10px] font-bold tracking-wider px-4 gap-1.5 disabled:opacity-40"
          >
            <HugeiconsIcon icon={Add01Icon} size={13} />
            {adding ? "ADDING…" : "ADD TEST CASE"}
          </Button>
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
