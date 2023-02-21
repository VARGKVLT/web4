package com.stpdiron.lab3.beans;

import java.io.Serializable;

public class RawDot implements Serializable {
    private float x = 0;
    private float y = 0;
    private float r = 1;

    public RawDot() {}
    public RawDot(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public void setX(float x) {
        this.x = x;
    }

    public void setY(float y) {
        this.y = y;
    }

    public void setR(float r) {
        this.r = r;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    @Override
    public String toString() {
        return "RawDot{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                '}';
    }
}
