package com.stpdiron.lab3.model.shapes;

import com.stpdiron.lab3.beans.RawDot;

import java.io.Serializable;


public abstract class Shape implements Serializable {
    public abstract boolean contain(RawDot dot);

    protected boolean upperL(RawDot dot) {
        return dot.getY() >= 0 && dot.getX() < 0;
    }

    protected boolean upperR(RawDot dot) {
        return dot.getY() >= 0 && dot.getX() >= 0;
    }

    protected boolean lowerR(RawDot dot) {
        return dot.getY() < 0 && dot.getX() >= 0;
    }

    protected boolean lowerL(RawDot dot) {
        return dot.getY() < 0 && dot.getX() < 0;
    }
}
