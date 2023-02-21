package com.stpdiron.lab3.model;

import com.stpdiron.lab3.beans.RawDot;
import com.stpdiron.lab3.entities.Dot;
import com.stpdiron.lab3.model.shapes.Shape;
import jakarta.ejb.Stateless;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Model;
import jakarta.inject.Inject;

import java.io.Serializable;



public class HitDetectionService implements Serializable {

    private Shape shape;

    @Inject
    public HitDetectionService(Shape shape) {
        this.shape = shape;
    }

    public Dot processDot(RawDot dot) {
        long startProc = System.currentTimeMillis();
        boolean hit = shape.contain(dot);
        return new Dot(dot, System.currentTimeMillis()-startProc, hit);
    }

    private static boolean inRange(float start, float stop, float num) {
        return num >= start && num <= stop;
    }

}
