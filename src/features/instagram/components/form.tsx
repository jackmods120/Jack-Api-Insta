"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { downloadFile } from "@/lib/utils";
import { getHttpErrorMessage } from "@/lib/http";
import { useVideoInfo } from "@/services/api/queries";

const formSchema = z.object({
  postUrl: z.string().url({ message: "Provide a valid Instagram post link" }),
});

export function InstagramVideoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { postUrl: "" },
  });

  const { error, isPending, mutateAsync: getVideoInfo } = useVideoInfo();
  const httpError = getHttpErrorMessage(error);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      const videoInfo = await getVideoInfo({ postUrl });
      const { filename, videoUrl } = videoInfo;
      downloadFile(videoUrl, { filename });
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="ios-card w-full max-w-2xl p-4 sm:p-6"
      >
        {httpError && (
          <div className="mb-3 rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {httpError}
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <FormField
            control={form.control}
            name="postUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="url"
                    placeholder="Paste Instagram link here..."
                    className="h-12 rounded-xl border-border/60 bg-secondary/50 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download
          </Button>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          If the download opens a new tab, right-click the video → Save as video.
        </p>
      </form>
    </Form>
  );
}
