"use client";

import {
  Add01Icon,
  Cancel01Icon,
  Delete02Icon,
  FloppyDiskIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { TestCaseManager } from "@/components/teacher/test-case-manager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SUPPORTED_LANGUAGES } from "@/lib/roles";
import { ChallengesController } from "@/services/challenges/controller";
import type { CodeTemplateResponse } from "@/services/challenges/types";
import type { ErrorResponse } from "@/services/iam/types";

function readError(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response) {
    return (err.response.data as ErrorResponse).message ?? fallback;
  }
  return fallback;
}

const CODE_CN =
  "min-h-40 bg-[#0a0a0c] border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 font-mono text-xs";
const INPUT_CN =
  "h-10 bg-[#0a0a0c] border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 font-mono text-sm";

function LanguagePicker({
  value,
  onChange,
  disabledLanguages = [],
}: {
  value: string;
  onChange: (lang: string) => void;
  disabledLanguages?: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUPPORTED_LANGUAGES.map((lang) => {
        const disabled = disabledLanguages.includes(lang) && lang !== value;
        return (
          <button
            key={lang}
            type="button"
            disabled={disabled}
            onClick={() => onChange(lang)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              value === lang
                ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                : "bg-white/[0.03] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}

function TemplateCard({
  challengeId,
  template,
  usedLanguages,
  onUpdated,
  onDeleted,
}: {
  challengeId: string;
  template: CodeTemplateResponse;
  usedLanguages: string[];
  onUpdated: (t: CodeTemplateResponse) => void;
  onDeleted: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [language, setLanguage] = useState(template.language);
  const [entryFunctionName, setEntryFunctionName] = useState(
    template.entryFunctionName,
  );
  const [templateCode, setTemplateCode] = useState(template.templateCode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetEdits() {
    setLanguage(template.language);
    setEntryFunctionName(template.entryFunctionName);
    setTemplateCode(template.templateCode);
    setError(null);
    setEditing(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updated = await ChallengesController.updateCodeTemplate(
        challengeId,
        template.codeTemplateId,
        { language, entryFunctionName, templateCode },
      );
      onUpdated(updated);
      setEditing(false);
    } catch (err) {
      setError(readError(err, "Could not save the template."));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setError(null);
    try {
      await ChallengesController.deleteCodeTemplate(
        challengeId,
        template.codeTemplateId,
      );
      onDeleted(template.codeTemplateId);
    } catch (err) {
      setError(readError(err, "Could not delete the template."));
    }
  }

  return (
    <div className="bg-[#121214] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-4 border-b border-white/5">
        {editing ? (
          <LanguagePicker
            value={language}
            onChange={setLanguage}
            disabledLanguages={usedLanguages}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[9px] font-mono font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
            >
              {template.language}
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              {template.entryFunctionName}()
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {editing ? (
            <>
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="h-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold tracking-wider px-3 gap-1.5 disabled:opacity-40"
              >
                <HugeiconsIcon icon={FloppyDiskIcon} size={13} />
                {saving ? "SAVING…" : "SAVE"}
              </Button>
              <button
                type="button"
                onClick={resetEdits}
                className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
                title="Cancel"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={15} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="p-1.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
                title="Edit template"
              >
                <HugeiconsIcon icon={PencilEdit02Icon} size={15} />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Delete template"
              >
                <HugeiconsIcon icon={Delete02Icon} size={15} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {editing && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              Entry function name
            </span>
            <Input
              value={entryFunctionName}
              onChange={(e) => setEntryFunctionName(e.target.value)}
              placeholder="twoSum"
              className={INPUT_CN}
            />
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-[9px] uppercase tracking-wider text-zinc-600">
            Template code
          </span>
          {editing ? (
            <Textarea
              value={templateCode}
              onChange={(e) => setTemplateCode(e.target.value)}
              className={CODE_CN}
            />
          ) : (
            <pre className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre-wrap">
              {template.templateCode}
            </pre>
          )}
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="pt-2 border-t border-white/5">
          <TestCaseManager
            challengeId={challengeId}
            codeTemplateId={template.codeTemplateId}
          />
        </div>
      </div>
    </div>
  );
}

export function CodeTemplateManager({
  challengeId,
  onCountChange,
}: {
  challengeId: string;
  onCountChange?: (count: number) => void;
}) {
  const [templates, setTemplates] = useState<CodeTemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New template draft
  const [showAdd, setShowAdd] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [entryFunctionName, setEntryFunctionName] = useState("");
  const [templateCode, setTemplateCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const usedLanguages = templates.map((t) => t.language);

  function syncCount(list: CodeTemplateResponse[]) {
    onCountChange?.(list.length);
  }

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await ChallengesController.getCodeTemplates(challengeId);
        if (active) {
          setTemplates(data);
          onCountChange?.(data.length);
        }
      } catch (err) {
        if (active) setError(readError(err, "Failed to load code templates."));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // onCountChange is the stable setTemplateCount setter from the parent.
  }, [challengeId, onCountChange]);

  function resetAddForm() {
    setLanguage("");
    setEntryFunctionName("");
    setTemplateCode("");
    setAddError(null);
    setShowAdd(false);
  }

  async function handleCreate() {
    if (!language) {
      setAddError("Pick a language.");
      return;
    }
    if (!entryFunctionName.trim() || !templateCode.trim()) {
      setAddError("Entry function name and template code are required.");
      return;
    }
    setCreating(true);
    setAddError(null);
    try {
      const created = await ChallengesController.createCodeTemplate(
        challengeId,
        {
          language,
          entryFunctionName,
          templateCode,
        },
      );
      setTemplates((prev) => {
        const next = [...prev, created];
        syncCount(next);
        return next;
      });
      resetAddForm();
    } catch (err) {
      setAddError(readError(err, "Could not create the template."));
    } finally {
      setCreating(false);
    }
  }

  function handleUpdated(updated: CodeTemplateResponse) {
    setTemplates((prev) =>
      prev.map((t) =>
        t.codeTemplateId === updated.codeTemplateId ? updated : t,
      ),
    );
  }

  function handleDeleted(id: string) {
    setTemplates((prev) => {
      const next = prev.filter((t) => t.codeTemplateId !== id);
      syncCount(next);
      return next;
    });
  }

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading code templates…</p>;
  }

  return (
    <div className="space-y-5">
      {error && <p className="text-sm text-red-400">{error}</p>}

      {templates.length === 0 && !showAdd && (
        <p className="text-sm text-zinc-500">
          No code templates yet. Add one per language you want to support.
        </p>
      )}

      <div className="space-y-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.codeTemplateId}
            challengeId={challengeId}
            template={template}
            usedLanguages={usedLanguages}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
          />
        ))}
      </div>

      {showAdd ? (
        <div className="bg-[#121214] border border-dashed border-white/10 rounded-xl p-4 space-y-4">
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              Language
            </span>
            <LanguagePicker
              value={language}
              onChange={setLanguage}
              disabledLanguages={usedLanguages}
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              Entry function name
            </span>
            <Input
              value={entryFunctionName}
              onChange={(e) => setEntryFunctionName(e.target.value)}
              placeholder="twoSum"
              className={INPUT_CN}
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              Template code
            </span>
            <Textarea
              value={templateCode}
              onChange={(e) => setTemplateCode(e.target.value)}
              placeholder={"def twoSum(nums, target):\n    pass"}
              className={CODE_CN}
            />
          </div>

          {addError && <p className="text-xs text-red-400">{addError}</p>}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={handleCreate}
              disabled={creating}
              className="h-9 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold tracking-wider px-4 gap-1.5 disabled:opacity-40"
            >
              <HugeiconsIcon icon={Add01Icon} size={14} />
              {creating ? "ADDING…" : "ADD TEMPLATE"}
            </Button>
            <button
              type="button"
              onClick={resetAddForm}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => setShowAdd(true)}
          className="h-10 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 rounded-lg text-xs font-bold tracking-wider px-5 gap-2"
        >
          <HugeiconsIcon icon={Add01Icon} size={15} />
          ADD CODE TEMPLATE
        </Button>
      )}
    </div>
  );
}
