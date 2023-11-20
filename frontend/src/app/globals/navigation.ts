import { Router } from "@angular/router";

export function navigateToPage( router: Router, page: string ) {
    return router.navigate( [ page ] )
}
