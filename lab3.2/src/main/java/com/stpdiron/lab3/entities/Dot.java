package com.stpdiron.lab3.entities;

import com.stpdiron.lab3.beans.RawDot;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class Dot implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private long id;
    private long workTime;
    private ZonedDateTime processedAt;
    private boolean hit;
    private float x;
    private float y;
    private float r;

    public Dot() {}

    public Dot(RawDot dot, long workTime, boolean hit) {
        setR(dot.getR());
        setX(dot.getX());
        setY(dot.getY());
        setHit(hit);
        setWorkTime(workTime);
        ZonedDateTime now = ZonedDateTime.now(ZoneId.systemDefault());
        setProcessedAt(now);
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
    public void setHit(boolean hit) {
        this.hit = hit;
    }
    public void setWorkTime(long workTime) {
        this.workTime = workTime;
    }
    public void setProcessedAt(ZonedDateTime processedAt) {
        this.processedAt = processedAt;
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
    public boolean isHit() {
        return hit;
    }
    public ZonedDateTime getProcessedAt() {
        return processedAt;
    }

    public String getProcessedAtFormatted() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy - HH:mm:ss");
        return processedAt.format(formatter);
    }

    public String getHitFormatted() {
        return hit ? "+" : "-";
    }

    public long getWorkTime() {
        return workTime;
    }

    @Override
    public String toString() {
        return "Dot{" +
                "id=" + id +
                ", workTime=" + workTime +
                ", processedAt=" + processedAt +
                ", hit=" + hit +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                '}';
    }
}
