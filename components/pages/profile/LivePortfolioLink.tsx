"use client";
import { Input } from "@nextui-org/react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const LivePortfolioLink = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);
  const handleFocus = (event: any) => event.target.select();
  const link = `${window.location.origin}/s/${id}`;
  return (
    <div className="flex gap-x-2 items-center">
      <p className="min-w-fit">Share profile </p>
      <Input variant="bordered" onFocus={handleFocus} value={link} />

      <CopyToClipboard
        text={link}
        onCopy={() => {
          setCopied(true);
          toast.success("Copied to clipboard");
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        {!copied ? (
          <Copy className="hover:text-emerald-500 transition-all" />
        ) : (
          <Check className="text-emerald-500" />
        )}
      </CopyToClipboard>
    </div>
  );
};

export default LivePortfolioLink;
