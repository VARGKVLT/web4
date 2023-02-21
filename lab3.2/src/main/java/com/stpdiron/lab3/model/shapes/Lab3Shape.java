package com.stpdiron.lab3.model.shapes;

import com.stpdiron.lab3.beans.RawDot;


public class Lab3Shape extends Shape {
    @Override
    public boolean contain(RawDot dot) {
        return  upperL(dot) && Math.pow(dot.getX(), 2) + Math.pow(dot.getY(), 2) <= Math.pow(dot.getR() /2, 2) ||
                lowerL(dot) && dot.getY() <= dot.getR() && dot.getX() <= dot.getR() ||
                lowerR(dot) && dot.getY() >= 2*dot.getX() - dot.getR() ;
    }

}
