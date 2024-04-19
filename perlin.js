class PerlinNoise {
    constructor() {
        this.perm = new Uint8Array(512);
        this.grad = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 512; i++) {
            this.perm[i] = Math.floor(Math.random() * 256);
            this.grad[i] = [Math.random() * 2 - 1, Math.random() * 2 - 1];
        }
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad2d(hash, x, y) {
        return this.grad[hash & 255][0] * x + this.grad[hash & 255][1] * y;
    }

    perlin(x, y) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = this.fade(x);
        const v = this.fade(y);
        const A = this.perm[X] + Y;
        const B = this.perm[X + 1] + Y;

        return this.lerp(v, this.lerp(u, this.grad2d(this.perm[A], x, y), this.grad2d(this.perm[B], x - 1, y)), this.lerp(u, this.grad2d(this.perm[A + 1], x, y - 1), this.grad2d(this.perm[B + 1], x - 1, y - 1)));
    }
}

export default PerlinNoise;