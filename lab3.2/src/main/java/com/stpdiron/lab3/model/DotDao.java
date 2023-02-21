package com.stpdiron.lab3.model;

import com.stpdiron.lab3.entities.Dot;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import java.util.List;
import java.util.logging.Logger;

public class DotDao {

    private final EntityManager manager;

    public DotDao(EntityManager entityManager) {
        manager = entityManager;
    }

    public List<Dot> getAll() {
        Query query = manager.createQuery("SELECT e FROM Dot e ORDER BY e.processedAt DESC", Dot.class);
        return (List<Dot>) query.getResultList();
    }

    public boolean addDot(Dot dot) {
        Logger logger = Logger.getLogger("application");
        try {
            manager.getTransaction().begin();
            manager.persist(dot);
            manager.getTransaction().commit();
            logger.info("Added "+dot.toString());
        } catch (RuntimeException e) {
            if (manager.getTransaction().isActive())
                manager.getTransaction().rollback();
            logger.warning(e.toString());
            return false;
        }
        return true;
    }
}
