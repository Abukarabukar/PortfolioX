import { Vector } from './Vector';

interface LightningConfig {
  Segments: number;
  Threshold: number;
  Width: number;
  Color: string;
  Blur: number;
  BlurColor: string;
  Alpha: number;
  GlowColor: string;
  GlowWidth: number;
  GlowBlur: number;
  GlowAlpha: number;
}

interface LineConfig {
  Color: string;
  With: number;
  Blur: number;
  BlurColor: string;
  Alpha: number;
}

export class Lightning {
  private config: LightningConfig;

  constructor(c: LightningConfig) {
    this.config = c;
  }

  Cast(context: CanvasRenderingContext2D, from: Vector, to: Vector): void {
    context.save();

    if (!from || !to) {
      return;
    }
    
    const v = new Vector(from.X1, from.Y1, to.X1, to.Y1);
    if (this.config.Threshold && v.Length() > context.canvas.width * this.config.Threshold) {
      return;
    }
    const vLen = v.Length();
    let refv = from;
    const lR = (vLen / context.canvas.width);
    const segments = Math.floor(this.config.Segments * lR);
    const l = vLen / segments;

    for (let i = 1; i <= segments; i++) {
      const dv = v.Multiply((1 / segments) * i);

      if (i !== segments) {
        dv.Y1 += l * Math.random();
        dv.X1 += l * Math.random();
      }
      
      const r = new Vector(refv.X1, refv.Y1, dv.X1, dv.Y1);
      
      this.Line(context, r, {
        Color: this.config.GlowColor,
        With: this.config.GlowWidth * lR,
        Blur: this.config.GlowBlur * lR,
        BlurColor: this.config.GlowColor,
        Alpha: this.Random(this.config.GlowAlpha, this.config.GlowAlpha * 2) / 100
      });

      this.Line(context, r, {
        Color: this.config.Color,
        With: this.config.Width,
        Blur: this.config.Blur,
        BlurColor: this.config.BlurColor,
        Alpha: this.config.Alpha
      });
      refv = r;
    }

    this.Circle(context, to, lR);
    this.Circle(context, from, lR);

    context.restore();
  }

  private Circle(context: CanvasRenderingContext2D, p: Vector, lR: number): void {
    context.beginPath();
    context.arc(p.X1 + Math.random() * 10 * lR, p.Y1 + Math.random() * 10 * lR, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.shadowBlur = 100;
    context.shadowColor = "#2319FF";
    context.fill();
  }

  private Line(context: CanvasRenderingContext2D, v: Vector, c: LineConfig): void {
    context.beginPath();
    context.strokeStyle = c.Color;
    context.lineWidth = c.With;
    context.moveTo(v.X, v.Y);
    context.lineTo(v.X1, v.Y1);
    context.globalAlpha = c.Alpha;
    context.shadowBlur = c.Blur;
    context.shadowColor = c.BlurColor;
    context.stroke();
  }

  private Random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}