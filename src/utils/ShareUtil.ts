import { RefObject } from "react";
import { View, Platform } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

/**
 * Captures a snapshot of the given View Ref and opens the system Share sheet.
 * @param viewRef - The React ref of the View to capture (must be typed as View).
 */
export const captureAndShareScreenshot = async (
  viewRef: RefObject<View>
): Promise<void> => {
  try {
    // 1. Safety check: Ensure the ref is actually attached to a component
    if (!viewRef.current) {
      console.warn(
        "ShareUtil: The view ref is null. Did you attach it to a <View>?"
      );
      return;
    }

    // 2. Check availability (Critical for Web compatibility)
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      alert("Sharing is not available on this platform.");
      return;
    }

    // 3. Capture the view
    // 'result: tmpfile' is best for sharing because it creates a local file path
    const uri = await captureRef(viewRef, {
      format: "png",
      quality: 0.8,
      result: "tmpfile",
    });

    // 4. Share the image
    await Sharing.shareAsync(uri, {
      dialogTitle: "Share this content", // Android only
      mimeType: "image/png",
      UTI: "public.png", // iOS only
    });
  } catch (error) {
    console.error("ShareUtil Error:", error);
  }
};
