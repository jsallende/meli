'use strict'

let collineal = (x1, y1, x2, y2, x3, y3) => {
	return (y1 - y2) * (x1 - x3) == (y1 - y3) * (x1 - x2)
}
let areCollineal = (point1, point2, point3) => {
	return collineal(point1.x,point1.y,point2.x,point2.y,point3.x,point3.y)
}
let isInsideTriangle = (candidate,p1,p2,p3) => {
	var v0 = [p3.x-p1.x,p3.y-p1.y]
	var v1 = [p2.x-p1.x,p2.y-p1.y]
	var v2 = [candidate.x-p1.x,candidate.y-p1.y]
	var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1])
	var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1])
	var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1])
	var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1])
	var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1])
	var invDenom = 1/ (dot00 * dot11 - dot01 * dot01)
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom
	return ((u >= 0) && (v >= 0) && (u + v < 1))
}
let getDistance = function( p1, p2 ) {
	var xs = p2.x - p1.x,
	ys = p2.y - p2.x
	xs *= xs
	ys *= ys
	return Math.sqrt( xs + ys )
}
let getPerimeter = (p1,p2,p3) => {
	return getDistance(p1,p2) + getDistance(p2,p3) + getDistance(p3,p1)
}

module.exports = {
	areCollineal,
	isInsideTriangle,
	getPerimeter
}