vec2 cartesianToSpherical(vec3 n)
{

    // TODO 6.4 a)
    // Convert cartesian coordinates to spherical coordinates.

    n = normalize(n);
    float theta = atan(n.z , n.x);
    float phi = acos(n.y);

    return vec2(theta,phi);
}

vec3 sphericalToCartesian(vec2 a)
{
    float theta = a.x;
    float phi = a.y;


    // TODO 6.4 a)
    // Convert spherical coordinates to cartesian coordinates.

    float x = sin(phi) * cos(theta);
    float y = cos(phi);
    float z = sin(phi) * sin(theta);
    return vec3(x, y, z);

}


vec2 sphericalToTexture(vec2 a)
{
    const float PI = 3.14159265;
    float theta = a.x; //in range [-PI,PI]
    float phi = a.y; // in range [0,PI]


    // TODO 6.4 a)
    // Compute texture coordinates from spherical coordinates.
	// Do not forget to mirror both coordinates to have the north pole at the top 
	// and France located west of Germany! ;)

    float u = 0.5f + theta / (2.0f * PI);
    float v = phi / PI;

    return vec2(1-u, 1-v);

}

