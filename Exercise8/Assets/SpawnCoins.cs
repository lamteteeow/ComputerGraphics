using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnCoins : MonoBehaviour
{
    public GameObject prefab;
    // Start is called before the first frame update
    void Start()
    {
        InvokeRepeating("NewCoin", 1.0f, 1.0f);
    }

    void NewCoin()
    {
    Vector3 position = new Vector3(Random.Range(-4.0f, 4.0f), Random.Range(0.0f, 3.0f), Random.Range(-4.0f, 4.0f));
    Instantiate(prefab, position, prefab.transform.rotation);
    if(gameObject.transform.localScale.x > 0.5f)
    {
        gameObject.transform.localScale *= 0.99f;
    };
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
