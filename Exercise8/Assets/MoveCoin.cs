using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveCoin : MonoBehaviour
{
    private GameObject ball;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        gameObject.transform.Rotate(0.0f, 0.0f, 5.0f, Space.Self);
        gameObject.transform.Translate(0.0f, 0.0f, - Mathf.Sin(Time.time * 2) *3/2 * Time.deltaTime);
    }

    void OnTriggerEnter(Collider other)
    {
    ball = GameObject.Find("Ball");
    if (other.gameObject == ball){
       Destroy(gameObject);
       ball.transform.localScale += new Vector3(0.1f, 0.1f, 0.1f);
    }
    }
}
