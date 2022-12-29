package utils;

import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ConcurrentShotCollection {
    private static ConcurrentShotCollection singleton = null;
    private final ConcurrentMap<String, Deque<Shot>> map;
    private ConcurrentShotCollection(){
        map = new ConcurrentHashMap<>();
    }

    public static synchronized ConcurrentShotCollection getInstance(){
            if (singleton == null)
            singleton = new ConcurrentShotCollection();
        return singleton;
    }

    public ConcurrentMap<String, Deque<Shot>> getMap() {
        return map;
    }
}
