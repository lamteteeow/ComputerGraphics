using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePlane : MonoBehaviour
{
    private Rigidbody body;
    // Start is called before the first frame update
    void Start()
    {
        body = gameObject.GetComponent(typeof(Rigidbody)) as Rigidbody;
        Debug.Log(body);
    }

    // Update is called once per frame
    void Update()
    {
    float horizontal = 0;
    float vertical = 0;
        if (Input.GetKey(KeyCode.W))
               {
                vertical = Input.GetAxis("Vertical");
                Debug.Log(vertical);
               }
        if (Input.GetKey(KeyCode.A))
               {
                horizontal = Input.GetAxis("Horizontal");
                Debug.Log(horizontal);
               }
        if (Input.GetKey(KeyCode.S))
               {
                vertical = Input.GetAxis("Vertical");
                Debug.Log(vertical);
               }
        if (Input.GetKey(KeyCode.D))
               {
                horizontal = Input.GetAxis("Horizontal");
                Debug.Log(horizontal);
               }

    Vector3 position = transform.position;
    Vector3 force = transform.TransformDirection(Vector3.down);

    if (horizontal > 0)
        {
        position = transform.TransformPoint(Vector3.right);
        force *= Mathf.Abs(horizontal);
        }
    if (horizontal < 0)
        {
        position = transform.TransformPoint(Vector3.left);
        force *= Mathf.Abs(horizontal);
        }
    if (vertical > 0)
        {
        position = transform.TransformPoint(Vector3.forward);
        force *= Mathf.Abs(vertical);
        }
    if (vertical < 0)
        {
        position = transform.TransformPoint(Vector3.back);
        force *= Mathf.Abs(vertical);
        }

    body.AddForceAtPosition(force, position);


    }
}
