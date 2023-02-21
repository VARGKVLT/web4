package com.stpdiron.lab3.beans.managed;

import com.stpdiron.lab3.beans.RawDot;
import com.stpdiron.lab3.entities.Dot;
import com.stpdiron.lab3.model.DotDao;
import com.stpdiron.lab3.model.HitDetectionService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Named
@ApplicationScoped
public class ResultsController {
    @Inject
    private HitDetectionService detectionService;
    @Inject
    private RawDot currentDot;
    private List<Dot> history;
    private DotDao dotDao;
    private EntityManager entityManager;

    @PostConstruct
    private void init() {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("helios");
        entityManager = factory.createEntityManager();
        dotDao = new DotDao(entityManager);
        history = dotDao.getAll();
    }

    @PreDestroy
    private void destroy() {
        entityManager.close();
    }

    public void matchResult() {
        Dot dot = detectionService.processDot(currentDot);
        if (dotDao.addDot(dot)) {
            history.add(dot);
            currentDot.setY(0);
            currentDot.setX(0);
        }
    }

    public RawDot getCurrentDot() {
        return currentDot;
    }

    public void setCurrentDot(RawDot currentDot) {
        this.currentDot = currentDot;
    }

    public List<Dot> getHistory() {
        return history;
    }

    public void setHistory(List<Dot> history) {
        this.history = history;
    }

}