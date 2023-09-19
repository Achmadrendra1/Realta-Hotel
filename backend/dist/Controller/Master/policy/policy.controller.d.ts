import { Policy } from 'src/entities/Policy';
import { PolicyService } from 'src/Service/Master/policy/policy.service';
export declare class PolicyController {
    private PolicyService;
    constructor(PolicyService: PolicyService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    PolicyName(params: any): Promise<any>;
    getPolicyByCategory(name: string): Promise<any>;
    createPolicy(data: Policy): Promise<"failed insert to policy" | " success insert to policy">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): Promise<any>;
}
