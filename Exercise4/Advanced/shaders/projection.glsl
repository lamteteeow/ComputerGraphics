
vec3 projectVertexToPlane(vec3 vertex, vec3 direction, vec3 pointOnPlane, vec3 planeNormal)
{
    vec3 projectedPoint;

    // TODO 4.4 a)
    // Project 'vertex' on the plane defined by 'pointOnPlane' and 'planeNormal'.
    // The projection direction is given by 'direction'.

vec3 v = pointOnPlane - vertex;
float dist = dot(v, planeNormal);
projectedPoint = vertex + (dist / dot(direction, planeNormal)) * direction;

    return projectedPoint;
}

