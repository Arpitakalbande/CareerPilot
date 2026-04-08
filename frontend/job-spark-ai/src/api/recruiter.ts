import axios from "axios";

export async function recruiterChatAPI(payload: any) {
  const res = await axios.post(
    "http://localhost:8000/api/v1/recruiter/chat",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

export async function recruiterTranscribeAPI(audioBlob: Blob, language = "en") {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recruiter-input.webm");
  formData.append("language", language);

  const res = await axios.post(
    "http://localhost:8000/api/v1/recruiter/transcribe",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data as { text: string };
}
