import google.generativeai as genai
import os
from fpdf import FPDF

# Configuración
os.environ["GEMINI_API_KEY"] = "TU_API_KEY_AQUI"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-pro')

def crear_pdf(titulo, contenido):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, titulo, 0, 1, 'C')
    pdf.ln(10)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, contenido)
    pdf.output("libro_generado.pdf")
    print("--- PDF CREADO CON ÉXITO ---")

def ejecutar():
    tema = input("¿De qué trata tu libro?: ")
    print("Escribiendo...")
    res = model.generate_content(f"Escribe un cuento corto sobre {tema}. Pon el título en la primera línea.")
    texto = res.text
    titulo = texto.split('\n')[0]
    cuerpo = "\n".join(texto.split('\n')[1:])
    crear_pdf(titulo, cuerpo)

if __name__ == "__main__":
    ejecutar()
