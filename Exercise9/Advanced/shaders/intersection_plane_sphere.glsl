
IntersectionResult intersectRayPlane(Ray ray, vec4 planeData) {
    vec3 n = planeData.xyz;
    float k = planeData.w;
    vec3 o = ray.origin;
    vec3 d = normalize(ray.direction);
    // TODO 11.2 b)
    // Ray-Plane Intersection
	// Have a look at the definition of struct "IntersectionResult" in rt.h.
	// You can use "EPSILON" defined in rt.glsl.
    bool isIntersect = false;
    
    vec3 p = k / n;
    float t = length((p - o) / d);
    
    
    if (t > 0)
    {
    return IntersectionResult(true, t, n, p, EPSILON);
    }
    else
    {
    return noIntersection;
    }
}


IntersectionResult intersectRaySphere(Ray ray, vec4 sphereData) {
    vec3 c = sphereData.xyz;
    float r = sphereData.w;
    vec3 o = ray.origin;
    vec3 d = normalize(ray.direction);
    // TODO 11.2 c)
    // Ray-Sphere Intersection
	// You can use "noIntersection" defined in rt.glsl.
	// Note that t has to be positive for the sphere to be in front of the camera:
	// Make sure that you cannot see objects behind the camera.

    
    
    vec3 p;
    if (distance((c+r), o) < distance((c-r), o))
    {
        p = c + r;
    }
    else
    {
        p = c - r;
}
    
    float t =  length((p - o) / d);
        
    if (t > 0)
    {
    return IntersectionResult(true, t, c, p, EPSILON);
    }
    else
    {
    return noIntersection;
    }

    
    

}
