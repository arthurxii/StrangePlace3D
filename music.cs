using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class music : MonoBehaviour {
    void Awake() {
        if (FindObjectsOfType<music>().Length != 1)
        {
            Destroy(gameObject);
        }
        else {
            DontDestroyOnLoad(gameObject);
        }
    }
    void OnLevelWasLoaded(int levelId) {
        Debug.Log("OnLevelWasLoaded");
        if (levelId == 2)
        {
            Destroy(gameObject);
        }
    }
}
