document.getElementById('notationType').addEventListener('change', function() {
    if (this.value === 'piano') {
        document.getElementById('pianoType').classList.remove('hidden');
    } else {
        document.getElementById('pianoType').classList.add('hidden');
    }
});

document.getElementById('generateButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput').files[0];
    if (!fileInput) {
        alert('Please upload an MP3 file first.');
        return;
    }

    const notationType = document.getElementById('notationType').value;
    const pianoType = document.getElementById('pianoType').value;
    document.getElementById('notationOutput').innerHTML = '';

    if (notationType === 'drums') {
        generateDrumNotation();
    } else {
        document.getElementById('notationOutput').innerHTML = `<p>Piano notation (${pianoType}) generated!</p>`;
    }

    document.getElementById('downloadPDF').classList.remove('hidden');
});

function generateDrumNotation() {
    const VF = Vex.Flow;
    const div = document.getElementById("notationOutput");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("percussion").setContext(context).draw();

    const notes = [
        new VF.StaveNote({ keys: ["c/5"], duration: "q" }).addModifier(new VF.Annotation("Snare"), 0),
        new VF.StaveNote({ keys: ["f/4"], duration: "q" }).addModifier(new VF.Annotation("Kick"), 0),
        new VF.StaveNote({ keys: ["g/5"], duration: "q" }).addModifier(new VF.Annotation("Hi-Hat"), 0)
    ];

    const voice = new VF.Voice({ num_beats: 3, beat_value: 4 });
    voice.addTickables(notes);
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
}

document.getElementById('downloadPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Generated Drum Notation", 10, 10);
    doc.save("drum_notation.pdf");
});
