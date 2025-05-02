import gradio as gr
import requests

def get_playlist(prompt):
    res = requests.post("http://localhost:5000/api/playlist", json={"prompt": prompt})
    if res.status_code == 200:
        tracks = res.json().get("tracks", [])
        return "\n\n".join([f"🎵 **{track['name']}** by *{track['artist']}*\n🔗 [Play on Spotify]({track['url']})"
                            for track in tracks])
    return "Something went wrong!"

gr.Interface(
    fn=get_playlist,
    inputs=gr.Textbox(placeholder="e.g., Lo-fi for debugging at midnight", label="Your Mood"),
    outputs=gr.Markdown(label="🎧 Generated Playlist"),
    title="🎶 CodeBeats",
    description="Tell me your vibe, and I’ll generate your coding playlist using AI + Spotify."
).launch()
