import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { message } from "antd";
import {
    useGetAboutUsQuery,
  useUpdateSettingMutation,
} from "../../redux/feature/setting.Api";

const AboutUs: React.FC = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);


  const {
    data: aboutUs,
    isLoading,
    error,
    refetch,
  } = useGetAboutUsQuery(undefined);

  // ✅ Update mutation
  const [updateAbout, { isLoading: isUpdating, error: updateError }] =useUpdateSettingMutation();


  useEffect(() => {
    if (aboutUs?.data) {
      setContent(aboutUs.data);
    }
  }, [aboutUs]);

  // ✅ Jodit Editor config
  const config = useMemo(
    () =>
      ({
        theme: "default",
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: true,
        toolbarSticky: false,
        enableDragAndDropFileToEditor: false,
        allowResizeX: false,
        allowResizeY: false,
        statusbar: false,
        buttons: [
          "source",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "ul",
          "ol",
          "|",
          "font",
          "fontsize",
          "brush",
          "paragraph",
          "|",
          "left",
          "center",
          "right",
          "justify",
          "|",
          "undo",
          "redo",
          "|",
          "hr",
          "eraser",
          "fullsize",
        ],
        readonly: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        toolbarButtonSize: "small" as const,
      } as any),
    []
  );

  // ✅ Save handler
  const handleSave = async () => {
    if (!content.trim()) {
      message.error("About Us Policy content cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      const result = await updateAbout({
       aboutUs: content,
      }).unwrap();

      if (result.success) {
        message.success("About Us Policy updated successfully");
        refetch();
      } else {
        message.error("Failed to update About Us Policy");
      }
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update About Us Policy. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="w-full h-[400px] border rounded-lg bg-white px-4 py-5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Loading About Us Policy...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="w-full h-[400px] border rounded-lg bg-white px-4 py-5 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading About Us Policy</p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg bg-white px-4 py-5">
      <h1 className="text-[20px] font-medium py-5 w-fit mx-auto">
        About Us Policy
      </h1>

      {/* ✅ Update error display */}
      {updateError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error updating About Us Policy. Please try again.
        </div>
      )}

      {/* ✅ Rich Text Editor */}
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
        config={config}
      />

      {/* ✅ Save Button */}
      <div className="flex items-center justify-end">
        <button
          className={`text-[16px] text-white px-10 py-2.5 mt-5 rounded-md ${
            isSaving || isUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleSave}
          disabled={isSaving || isUpdating}
        >
          {isSaving || isUpdating ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(AboutUs);
